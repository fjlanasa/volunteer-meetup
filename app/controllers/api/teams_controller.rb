class Api::TeamsController < ApiController
  def index
    user = current_user
    render json: { message: 'hello' }, status: :ok
  end

  def show
  end

  def create
    team = Team.new(team_params)
    if team.save
      Signup.create(team_id: team.id, user_id: team_params[:organizer_id])
      render json: {team: team}
    end
  end

  def update
    team = Team.find(params[:id])
    team.update_attributes(team_params)
    render json: { message: 'hello'}, status: :ok
  end

  private
  def team_params
    params.require(:team).permit(:organizer_id, :site_id, :meeting_time, :meeting_location, :open, :total_supplies, :total_workers)
  end
end
