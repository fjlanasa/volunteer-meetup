class Api::VolunteersController < ApiController
  include SiteHelper
  def index
    all_users = User.all
    user = current_user
    if !user.nil?
      current_user_potential_sites = potential_sites(current_user).reverse
    else
      current_user_potential_sites = []
    end
    render json: { all_users: all_users, current_user_potential_sites:
      current_user_potential_sites, current_user: user}, status: :ok
  end

  def update
    user = User.find(params[:id])
    user.update_attributes(user_params)
    render json: { message: 'Successfully updated your volunteer preferences'}, status: :ok
  end

  def user_params
    params.require(:user).permit(:location, :labor, :supplies, :max_milage)
  end
end
