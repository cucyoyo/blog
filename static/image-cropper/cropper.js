var cropper = new Cropper({
  aspectRatio: 'auto',
  element: document.getElementById('cropper-target'),
  previews: [
    document.getElementById('preview-large'),
    document.getElementById('preview-medium'),
    document.getElementById('preview-small')
  ],
  onCroppedRectChange: function(rect) {
    console.log(rect);
  }
});
var input = document.getElementById('cropper-input');
input.onchange = function() {
  if (typeof FileReader !== 'undefined') {
    var reader = new FileReader();
    reader.onload = function (event) {
      cropper.setImage(event.target.result);
    };
    if (input.files && input.files[0]) {
      reader.readAsDataURL(input.files[0]);
    }
  } else { // IE10-
    input.select();
    input.blur();

    var src = document.selection.createRange().text;
    cropper.setImage(src);
  }
};