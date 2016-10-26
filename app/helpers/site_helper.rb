require 'open-uri'
require 'json'

module SiteHelper
  def get_map_url(lat, lng, address)
    "https://maps.googleapis.com/maps/api/staticmap?center=#{address}" +
    "&zoom=13&size=500x250&maptype=roadmap&markers=color:blue%7C#{lat},#{lng}" +
    "&key=#{ENV['GOOGLE_MAPS_KEY']}"
  end

  def calculate_distances(volunteer)
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?" +
    "origins=#{volunteer.location}&destinations="
    Site.all.each do |site|
      url += "#{site.location}|"
    end
    url += "&units=imperial&key=#{ENV['GOOGLE_MAPS_KEY']}"
    url=URI.parse(url)
    str = url.read
    data=JSON.parse(str)
  end

  def site_should_display?(volunteer, site)
    if volunteer.id == site.user.id
      return false
    end
    if !site.team.nil?
      if site.team.users.any? {|vol| vol.id == volunteer.id} || !site.team.open
        return false
      end
    end
    true
  end


  def potential_sites(volunteer)
    potential_sites = []
    if volunteer.labor || volunteer.supplies >= 1
      if !volunteer.location.nil? && volunteer.max_milage != 9999
        site_distances = calculate_distances(volunteer)
        Site.all.each_with_index do |site, index|
          if site_should_display?(volunteer, site)
            if !site_distances['rows'][0]['elements'][index]['distance'].nil?
              distance = site_distances['rows'][0]['elements'][index]['distance']['text'].split(' ')[0].gsub(',','').to_f
              if distance <= volunteer.max_milage
                potential_sites.push(site)
              end
            end
          end
        end
      else
        Site.all.each do |site|
          if site_should_display?(volunteer, site)
            potential_sites.push(site)
          end
        end
      end
    end
    return potential_sites
  end
end
