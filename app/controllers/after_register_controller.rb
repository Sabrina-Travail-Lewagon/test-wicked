class AfterRegisterController < ApplicationController
  include Wicked::Wizard

  steps :step1

  def show
    @user = current_user
    render_wizard
  end

  def update
    @user = current_user
    @user.update(user_params)
    render_wizard @user
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :location, :country, :a_propos, photo: [])
  end
end
