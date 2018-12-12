class ImageUploader < CarrierWave::Uploader::Base
  storage :file
  include CarrierWave::MiniMagick
  process resize_to_fit: [200, 200]
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(.jpg .jpeg .png)
  end

end
