        var date = new Date();
        var today = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        $("#searchbtn").click(function () {
            var pin = $('#pin').val();
            if (pin == '' || pin == undefined) {
                alert('please enter pin code');
                return;
            }
            $.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pin +
                "&date=" + today,
                function (data, status) {
                    if (status) {
                        var sessions = data.sessions ? data.sessions : [];
                        if (sessions) {
                            for (var i = 0; i <= sessions.length; i++) {
                                var classname = "info";
                                if (i % 2 == 0) {
                                    classname = "success"
                                }
                                $('#session tbody').append("<tr class=" + classname + "><td>" + sessions[i]
                                    .name + "</td><td>" + sessions[i].pincode + "</td><td>" + sessions[i].date + "</td><td>" + sessions[i].available_capacity + "</td><td>" +
                                    sessions[i].available_capacity_dose1 + "</td></tr>")
                            }
                        }
                    } else {
                        alert('error');
                    }

                });
        });
