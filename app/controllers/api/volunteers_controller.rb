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
end
