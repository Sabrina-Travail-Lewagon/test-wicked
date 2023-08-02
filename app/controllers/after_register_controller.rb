class AfterRegisterController < ApplicationController
  include Wicked::Wizard

  steps :step1, :step2

  def show
    @user = current_user
    render_wizard
  end

  def update
    @user = current_user
    @user.update(user_params)
    # Vérifier s'il s'agit de la dernière étape, puis compléter le wizard
    if step == steps.last
      sign_in(@user) # Connecter l'utilisateur
      redirect_to root_path, notice: "L'inscription est complète!"
    else
      # Rediriger vers l'étape suivante
      redirect_to next_wizard_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :location, :country, :a_propos, photo: [])
  end
end
