Rails.application.routes.draw do
  devise_for :users, skip: :all
  devise_scope :user do
    get '/users/sign_in' => 'devise/sessions#new', as: :new_user_session
    post '/users/sign_in' => 'devise/sessions#create', as: :user_session
    delete '/users/sign_out' => 'devise/sessions#destroy', as: :destroy_user_session
    get '/users/sign_up' => 'devise/registrations#new', as: :new_user_registration
    post 'users' => 'devise/registrations#create', as: :user_registration
  end
  namespace :api, { format: 'json' } do
    resources :messages, only: [:index, :create]
    resources :search, only: [:index]
    resources :relationships, only: [:create, :destroy]
    resources :users, only: [:index]
  end
  root 'messages#index'
  resources :users, only: [:edit, :update, :show]
end
