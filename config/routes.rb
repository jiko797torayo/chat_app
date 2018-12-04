Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    resources :messages
    resources :search
  end
  root 'messages#index'
  resources :users, only: [:edit, :update, :show]
end
