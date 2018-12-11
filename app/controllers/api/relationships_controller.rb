module Api
  class RelationshipsController < ApplicationController
    before_action :get_to_user

    def create
      @to_user.relationship(current_user)
      @user = current_user.relationship(@to_user)
      render json: @user
    end

    def destroy
      @to_user.destroy_relationship(current_user)
      current_user.destroy_relationship(@to_user)
      get_current_user_relationships
      get_already_relationship_users
      @users = User.where(id: @already_relationship_users)
      render json: @users
    end

    private

    def get_to_user
      @to_user = User.find(params[:to_user_id])
    end
  end
end
