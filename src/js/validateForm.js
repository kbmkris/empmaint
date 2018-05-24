function validateForm(add) {
  var valid = true;
  var fName = $('#fName').val();
  var lName = $('#lName').val();
  var sapId = $('#sapId').val();
  var mobile = $('#mobile').val();
  var emailId = $('#emailId').val();
  var empDetails = {};
  var employee = {};
  var mailPattern = /^(\w|[!#$%&\'*+-/=?^_`{|}~])+@(\w|\.)+\.(\w)+$/;
  $('.msg').empty(); // clear out any error message if exist before

  // validate error messages from bottom to top so that focus
  // will be in first form field having error

  if (!emailId) {
    $('#emailId').after('<p class="msg">! Missing email Id</p>');
    $('#emailId').focus();
    valid=false;
  } else if (! mailPattern.test(emailId)) {
    $('#emailId').after('<p class="msg">! Invalid email Id</p>');
    $('#emailId').focus();
    valid=false;
  }
  if (!mobile) {
    $('#mobile').after('<p class="msg">! Missing Mobile Number</p>');
    $('#mobile').focus();
    valid=false;
  } else if (mobile < 1000000000 || mobile > 9999999999) {
    $('#mobile').after('<p class="msg">! Mobile number should be 10 digits</p>');
    $('#mobile').focus();
    valid=false;
  }
  if (!sapId) {
    $('#sapId').after('<p class="msg">! Missing SAP ID</p>');
    $('#sapId').focus();
    valid=false;
  } else if (sapId < 1) {
    $('#sapId').after('<p class="msg">! Invalid SAP ID</p>');
    $('#sapId').focus();
    valid=false;
  } else {
    if (add) { // validate for existing sapID only in case of addNew
      $.each(data, function(key, value) {
        if (sapId == value.sapId) {
          $('#sapId').after('<p class="msg">! SAP ID already exists</p>');
          $('#sapId').focus();
          valid=false;
          return false;
        }
      });
    }
  }
  if (!lName) {
    $('#lName').after('<p class="msg">! Missing Last Name</p>');
    $('#lName').focus();
    valid=false;
  }
  if (!fName) {
    $('#fName').after('<p class="msg">! Missing First Name</p>');
    $('#fName').focus();
    valid=false;
  }

  if (valid){
    empDetails = {};
    employee = {};
    empDetails.fName = fName;
    empDetails.lName = lName;
    empDetails.mobile = mobile;
    empDetails.emailId = emailId;
    employee.sapId = sapId;
    employee.details = empDetails;
    //based on input parameter - either add or update it
    if (add) {
      // data should be declared in main script and it should have values
        data.push(employee);
        window.localStorage.setItem("employee", JSON.stringify(data));
        $('#maindiv').empty();
        $('#maindiv').load("src/maintain.html");
    } else {
      $.each(data, function(key,value) {
        if (value.sapId == sapId) {
          data[key].details = empDetails;
          localStorage.setItem("employee",JSON.stringify(data));
          $('#maindiv').empty();
          $('#maindiv').load("src/maintain.html");
          return false;
        }
      });
    }
  } else {
    console.log('not valid -- This should not happen');
  }
}
