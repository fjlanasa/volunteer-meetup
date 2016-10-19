class Api::SignupsController < ApiController
  def create
    signup = Signup.new(signup_params)
    if signup.save
      render json: {message: 'You successfully joined this team!'}
    else
      render json:{message: signup.errors.full_messages[0]}
    end
  end

  private
  def signup_params
    params.require(:signup).permit(:team_id, :volunteer_id)
  end
end
