module Api
  class SearchController < ApplicationController
    def index
      @search = User.all
      render json: @search
    end
  end
end
