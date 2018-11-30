Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    resources :messages
  end
  root 'messages#index'
  resources :users, only: [:edit, :update, :show]
end
