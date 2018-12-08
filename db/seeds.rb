users = ['a', 'b', 'c', 'abc']

users.each do |user|
  User.create!(name:  "#{user}",
               email: "#{user}@#{user}.com",
               password:              "12345678",
               password_confirmation: "12345678",
               )
end
