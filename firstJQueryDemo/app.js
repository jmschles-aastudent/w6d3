var names = []
function Name (fname, lname) {
  this.fname = fname;
  this.lname = lname;
}

Name.prototype.render = function () {
  return this.fname + " " + this.lname;
};

function NameWidget(div) {
  this.promptEl = div.find(".prompt");
  this.inputEl = div.find(".input");
  this.submitEl = div.find(".submit");
  this.contentEl = div.find(".content");
}

NameWidget.prototype.installFNameHandler = function () {
  this.promptEl.text("Enter First Name!");
  this.submitEl.off('click');

  var that = this;
  this.submitEl.click(function () {
    that.handleFNameClick();
  });
};

NameWidget.prototype.handleFNameClick = function () {
  this.fname = this.inputEl.val();
  this.installLNameHandler();
};

NameWidget.prototype.installLNameHandler = function () {
  this.promptEl.text("Enter Last Name!");
  this.submitEl.off('click');

  var that = this;
  this.submitEl.click(function () {
    that.handleLastNameClick();
  });
};

NameWidget.prototype.handleLastNameClick = function () {
  var lname = this.inputEl.val();
  var newName = new Name(this.fname, lname);

  names.push(newName);
  this.contentEl.append(newName.render());

  this.installFNameHandler();
};

$(function () {
  $(".name-form").each(function (index, nameForm) {
    new NameWidget($(this)).installFNameHandler();
  });
});
