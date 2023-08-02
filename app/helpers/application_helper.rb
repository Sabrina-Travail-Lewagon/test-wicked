module ApplicationHelper
  def country_options_for_select
    countries = ISO3166::Country.all.map { |c| [c.translations['en'], c.alpha2] }
    countries
  end
end
