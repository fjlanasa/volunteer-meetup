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
      Site.all.each do |site|
        if site.user.id != volunteer.id
          if !site.team.nil?
            if !site.team.users.any? {|vol| vol.id == volunteer.id} && site.team.open
              if !volunteer.location.nil? && volunteer.max_milage != 9999
                distance = calculate_distance(site, volunteer)
                if distance <= volunteer.max_milage
                  potential_sites.push(site)
                end
              else
                potential_sites.push(site)
              end
            end
          else
            if !volunteer.location.nil? && volunteer.max_milage != 9999
              distance = calculate_distance(site, volunteer)
              if distance <= volunteer.max_milage
                potential_sites.push(site)
              end
            else
              potential_sites.push(site)
            end
          end
        end
      end
    end
    potential_sites
  end
end
