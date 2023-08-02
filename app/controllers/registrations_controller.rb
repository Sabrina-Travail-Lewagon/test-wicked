class RegistrationsController < Devise::RegistrationsController
  def create
    super
  end

  protected

  def after_sign_up_path_for(resource)
    after_register_path(:step1)
  end
end
