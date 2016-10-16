Rails.application.routes.draw do
  devise_for :users
  root 'sites#index'
  
  namespace :api do
    resources :sites
  end

  resources :sites
end
