class Api::VolunteersController < ApiController
  def index
    all_volunteers = Volunteer.all
    current_volunteer = Volunteer.find(current_user.id)
    render json: { message: 'hello', all_volunteers: all_volunteers, current_volunteer: current_volunteer }, status: :ok
  end
end
