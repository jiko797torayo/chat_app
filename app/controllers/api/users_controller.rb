module Api
  class UsersController < ApplicationController
    def index
      @users = []
      users = Relationship.where(from_user_id: current_user.id)
      users.each do |user|
        @users << User.find(user.to_user_id)
      end
      render json: @users
    end
  end
end
