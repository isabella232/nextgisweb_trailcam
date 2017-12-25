import os, datetime, uuid
from PIL import Image
from resizeimage import resizeimage

THUMBNAIL_WIDTH = 300
THUMBNAIL_HEIGHT = 300


def write_image(request, base64_image, image_name):
    storage_path = request.env.trailcam.settings['storage_path']

    now = datetime.datetime.now()
    dir_name = now.strftime('%Y-%m-%d')
    dir_path = '{storage_path}{dir_name}/'.format(
        storage_path=storage_path,
        dir_name=dir_name
    )
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    file_name = uuid.uuid4()
    file_extension = image_name.split('.')[-1].lower()

    relative_file_path = '{dir_name}/{file_name}.{file_extension}'.format(
        dir_name=dir_name,
        file_name=file_name,
        file_extension=file_extension
    )
    file_path = '{storage_path}{relative_file_path}'.format(
        storage_path=storage_path,
        relative_file_path=relative_file_path
    )

    relative_file_path_thumbnail = '{dir_name}/{file_name}_{thumb_width}x{thumb_height}.{file_extension}'.format(
        dir_name=dir_name,
        file_name=file_name,
        thumb_width=THUMBNAIL_WIDTH,
        thumb_height=THUMBNAIL_HEIGHT,
        file_extension=file_extension
    )
    file_path_thumbnail = '{storage_path}{relative_file_path_thumbnail}'.format(
        storage_path=storage_path,
        relative_file_path_thumbnail=relative_file_path_thumbnail
    )

    with open(file_path, 'wb') as f:
        f.write(base64_image.decode('base64'))

    with open(file_path, 'r+b') as f:
        file_size = os.path.getsize(f.name)
        with Image.open(f) as image:
            cover = resizeimage.resize_thumbnail(image, [300, 300])
            cover.save(file_path_thumbnail, image.format)

    return {
        'file_path': relative_file_path,
        'file_path_thumbnail': relative_file_path_thumbnail,
        'file_size': file_size
    }
