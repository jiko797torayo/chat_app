class UsersController < ApplicationController
  before_action :check_current_user, only: [:edit, :show]

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def check_current_user
    redirect_to root_path unless params[:id].to_i == current_user.id
  end
end
