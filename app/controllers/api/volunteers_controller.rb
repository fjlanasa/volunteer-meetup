class Api::VolunteersController < ApiController
  include SiteHelper
  def index
    all_volunteers = Volunteer.all
    user = current_user
    if !user.nil?
      current_volunteer = Volunteer.find(user.id)
      current_volunteer_potential_sites = potential_sites(current_volunteer).reverse

    else
      current_volunteer = nil.to_json
      user = nil.to_json
      current_volunteer_potential_sites = []
    end
    render json: { message: 'hello', all_volunteers: all_volunteers,
      current_volunteer: current_volunteer, current_volunteer_potential_sites:
      current_volunteer_potential_sites, current_user: user}, status: :ok
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
