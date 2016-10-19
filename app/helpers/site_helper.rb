require 'open-uri'
require 'json'

module SiteHelper
  def get_map_url(lat, lng, address)
    "https://maps.googleapis.com/maps/api/staticmap?center=#{address}" +
    "&zoom=13&size=500x250&maptype=roadmap&markers=color:blue%7C#{lat},#{lng}" +
    "&key=#{ENV['GOOGLE_MAPS_KEY']}"
  end

  def calculate_distance(site1, site2)
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?" +
    "origins=#{site1.location}&destinations=#{site2.location}" +
    "&units=imperial&key=#{ENV['GOOGLE_MAPS_KEY']}"
    url=URI.parse(url)
    str = url.read
    data=JSON.parse(str)
    data['rows'][0]['elements'][0]['distance']['text'].split(' ')[0].gsub(',','').to_f
  end

  def potential_sites(volunteer)
    potential_sites = []
    if volunteer.labor || volunteer.supplies
      if !volunteer.location.nil? && volunteer.max_milage != 9999
        Site.all.each do |site|
          distance = calculate_distance(site, volunteer)
          if distance <= volunteer.max_milage
            if site.team.nil?
              potential_sites.push(site)
            elsif site.team.open
              potential_sites.push(site)
            end
          end
        end
      else
        potential_sites = Site.all
      end
    end
    potential_sites
  end
end
