class Api::VolunteersController < ApiController
  def index
    all_volunteers = Volunteer.all
    if !current_user.nil?
      current_volunteer = Volunteer.find(current_user.id)
    else
      current_volunteer = nil
    end
    render json: { message: 'hello', all_volunteers: all_volunteers, current_volunteer: current_volunteer , current_user: current_user}, status: :ok
  end

  def update
    volunteer = Volunteer.find(params[:id])
    volunteer.update_attributes(volunteer_params)
    render json: { message: 'hello'}, status: :ok
  end

  def volunteer_params
    params.require(:volunteer).permit(:location, :labor, :supplies, :max_milage, :user_id)
  end
end
