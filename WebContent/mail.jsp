<%@ page import="contact.JavaEmail"%>
<%-- <%@ page import="javax.mail.MessagingException;"%> --%>
<%
	String message = null;
	String status = null;

		JavaEmail javaEmail = new JavaEmail();
		javaEmail.setMailServerProperties();
		String emailSubject = "Contact Form TTH Website US";
		String emailBody = "Auto Generated Email from TTH Website:";
		if (request.getParameter("form_fields[message]") != null) {
			emailBody = "\t<b>Sender Name: </b>" + request.getParameter("form_fields[fname]")
					+ "<br>";
		}
		if (request.getParameter("form_fields[email]") != null) {
			emailBody = emailBody + "\t <h2><b>Sender Email:</b> "
					+ request.getParameter("form_fields[email]") + "<br>";
		}
		if (request.getParameter("form_fields[phone]") != null) {
			emailBody = emailBody + "\t <h2><b>Sender Phone: </b>"
					+ request.getParameter("form_fields[phone]") + "<br>";
		}
		/* if (request.getParameter("input_4") != null) {
			emailBody = emailBody + "\t <h2><b>Company: </b>" + request.getParameter("input_4")
					+ "<br>"; */
		
		if (request.getParameter("form_fields[message]") != null) {
			emailBody = emailBody + "\t <b>Message: </b>" + request.getParameter("form_fields[message]")
					+ "<br>";
		}
		System.out.println(request.getParameter("form_fields[message]"));
		System.out.println(request.getParameter("form_fields[email]"));

		System.out.println(request.getParameter("form_fields[phone]"));

		/* System.out.println(request.getParameter("input_4")); */
				System.out.println(request.getParameter("form_fields[message]"));
		

		javaEmail.createEmailMessage(emailSubject, emailBody);
		try {
			javaEmail.sendEmail();
			status = "success";
			 out.write("<script type='text/javascript'>\n");
              out.write("alert('Message send Successfully');");
              out.write("setTimeout(function(){window.location.href='contact.jsp'},0);");
              out.write("</script>\n");  
		} catch (Exception me) {
			me.printStackTrace();
		}
	
%>