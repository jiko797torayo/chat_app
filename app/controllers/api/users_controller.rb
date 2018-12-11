module Api
  class UsersController < ApplicationController
    def index
      users = Relationship.where(from_user_id: current_user.id)
      to_user_ids = []
      users.each do |user|
        to_user_ids << user.to_user_id
      end
      @users = User.where(id: to_user_ids)
      render json: @users
    end
  end
end
