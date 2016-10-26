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

  def create
    team = Team.new(team_params)
    if team.save
      Signup.create(team_id: team.id, user_id: team_params[:organizer_id],
      supplies: params[:supplies], labor: params[:labor])
      render json: {team: team, message: 'Successfully created a new team!'}, status: :ok
    else
      render json: {message: team.errors.full_messages[0]}, status: :ok
    end
  end

  def show
    post = []
    posts = Post.where(team_id: params[:id]).order(updated_at: :desc).to_a
    posts.map! {|post| post.attributes.merge({'user_name'=> User.find(post.user_id).full_name, 'team_site' => post.team.site})}
    render json: {posts: posts}
  end

  def update
    team = Team.find(params[:id])
    team.assign_attributes(team_params)
    if team.save
      render json: { message: 'Successfully updated your team!'}, status: :ok
    else
      render json: { message: team.errors.full_messages[0]}, status: :ok
    end
  end

  def destroy
    team = Team.find(params[:id])
    team.destroy
    render json: {message: 'Successfully deleted your team'}, status: :ok
  end

  private
  def team_params
    params.require(:team).permit(:organizer_id, :site_id, :meeting_time,
    :meeting_date, :meeting_location, :open, :total_supplies, :total_workers)
  end
end
