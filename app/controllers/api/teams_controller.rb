class Api::TeamsController < ApiController
  def index
    user = current_user
    render json: { message: 'hello' }, status: :ok
  end

  def show
  end

  def create
    binding.pry
    team = Team.new(team_params)
    if team.save
      site = Site.find(params[:site_id])
      site.update_attribute(:team_id, team.id)
      Signup.create(team_id: team.id, user_id: team_params[:organizer_id])
      render json: {team: team}
    end
  end

  private
  def team_params
    params.require(:team).permit(:organizer_id)
  end
end
