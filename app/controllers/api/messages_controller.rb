module Api
  class MessagesController < ApplicationController

    def index
      from_relationship = Relationship.find_by(from_user_id: current_user.id, to_user_id: params[:to_user_id])
      to_relationship = Relationship.find_by(from_user_id: params[:to_user_id], to_user_id: current_user.id)
      if from_relationship
        @messages = Message.where(relationship_id: [from_relationship.id, to_relationship.id])
      else
        @messages = []
      end
      render json: @messages
    end

    def create
      from_relationship = Relationship.find_by(from_user_id: current_user.id, to_user_id: params[:to_user_id])
      to_relationship = Relationship.find_by(from_user_id: params[:to_user_id], to_user_id: current_user.id)
      params.store('user_id', current_user.id)
      params.store('relationship_id', from_relationship.id)
      Message.create(message_params)
      @messages = Message.where(relationship_id: [from_relationship.id, to_relationship.id])
      render json: @messages
    end

    private
    def message_params
      params.permit(:contents, :picture, :user_id, :relationship_id)
    end
  end
end
