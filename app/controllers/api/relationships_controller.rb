module Api
  class RelationshipsController < ApplicationController
    def index
      @users = []
      users = Relationship.where(from_user_id: current_user.id)
      users.each do |user|
        @users << User.find(user.to_user_id)
      end
      render json: @users
    end

    def create
      user = User.find(params[:to_user_id])
      user.relationship(current_user)
      @user = current_user.relationship(user)
      render json: @user
    end

    def destroy
      @user = Relationship.find(params[:id]).to_user
      current_user.destroy_relationship(@user)
      @user.destroy_relationship(current_user)
      render json: @user
    end
  end
end
