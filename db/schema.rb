# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161025195701) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "posts", force: :cascade do |t|
    t.text     "body",       null: false
    t.integer  "team_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["team_id"], name: "index_posts_on_team_id", using: :btree
    t.index ["user_id"], name: "index_posts_on_user_id", using: :btree
  end

  create_table "signups", force: :cascade do |t|
    t.integer "team_id",                  null: false
    t.integer "user_id",                  null: false
    t.boolean "labor",    default: false
    t.integer "supplies", default: 0
  end

  create_table "sites", force: :cascade do |t|
    t.string  "location",        null: false
    t.string  "contact_name",    null: false
    t.string  "contact_phone",   null: false
    t.string  "square_footage",  null: false
    t.text    "special_details"
    t.integer "user_id",         null: false
    t.float   "lat"
    t.float   "lng"
    t.string  "static_map_url"
  end

  create_table "teams", force: :cascade do |t|
    t.string  "meeting_location"
    t.string  "meeting_time"
    t.boolean "open",             default: true, null: false
    t.integer "organizer_id",                    null: false
    t.integer "total_workers",    default: 0,    null: false
    t.integer "total_supplies",   default: 0,    null: false
    t.integer "site_id",                         null: false
    t.string  "meeting_date"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",             default: "",    null: false
    t.string   "last_name",              default: "",    null: false
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "phone_number",                           null: false
    t.boolean  "labor",                  default: false
    t.integer  "max_milage",             default: 9999,  null: false
    t.string   "location"
    t.integer  "supplies",               default: 0
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
