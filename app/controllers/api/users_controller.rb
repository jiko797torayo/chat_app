module Api
  class UsersController < ApplicationController
    before_action :get_current_user_relationships
    before_action :get_already_relationship_users

    def index
      @users = User.where(id: @already_relationship_users)
      render json: @users
    end
  end
end
