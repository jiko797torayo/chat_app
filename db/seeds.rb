names = Array.new(1000) { Faker::Name.unique.first_name }
names.each do |name|
  name.downcase
  email = "#{name}@#{name}.com"
  User.create!(name:  name,
               email: email,
               password:              "12345678",
               password_confirmation: "12345678",
  )
end
