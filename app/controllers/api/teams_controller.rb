class Api::TeamsController < ApiController
  def index
    user = current_user
    user_vol_sites = []
    posts = []
    if !user.nil?
      user_teams = user.teams
      user_vol_sites = []
      user_teams.each do |team|
        user_vol_sites.push(team.site)
        team.posts.each do |post|
          posts.push(post)
        end
      end
    end
    posts.sort! {|a,b| b.updated_at <=> a.updated_at}
    posts = posts.take(10)
    posts.map! {|post| post.attributes.merge({'user_name' => User.find(post.user_id).full_name, 'team_site' => post.team.site})}
    render json: { user: user, user_vol_sites: user_vol_sites, recent_posts: posts }, status: :ok
  end

  def show
  end

  def create
    team = Team.new(team_params)
    if team.save
      Signup.create(team_id: team.id, user_id: team_params[:organizer_id],
      supplies: params[:supplies], labor: params[:labor])
      render json: {team: team}
    end
  end

  def update
    team = Team.find(params[:id])
    team.update_attributes(team_params)
    render json: { message: 'hello'}, status: :ok
  end

  def destroy
    team = Team.find(params[:id])
    team.destroy
    render json: {message: 'deleted'}, status: :ok
  end

  private
  def team_params
    params.require(:team).permit(:organizer_id, :site_id, :meeting_time,
    :meeting_date, :meeting_location, :open, :total_supplies, :total_workers)
  end
end
