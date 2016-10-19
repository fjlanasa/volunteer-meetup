class Api::TeamsController < ApiController
  def index
    render json: { message: 'hello' }, status: :ok
  end

  def create
    team = Team.new(team_params)
    if team.save
      site = Site.find(params[:site_id])
      site.update_attribute(:team_id, team.id)
      Signup.create(team_id: team.id, volunteer_id: Volunteer.find(team_params[:user_id]).user.id)
      render json: {team: team}
    end
  end

  private
  def team_params
    params.require(:team).permit(:user_id)
  end
end
