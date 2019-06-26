<%@ page import="contact.JavaEmail"%>
<%-- <%@ page import="javax.mail.MessagingException;"%> --%>
<%
	String message = null;
	String status = null;

		JavaEmail javaEmail = new JavaEmail();
		javaEmail.setMailServerProperties();
		String emailSubject = "Contact Form TTH Website US";
		String emailBody = "Auto Generated Email from TTH Website:";
		if (request.getParameter("form_fields[name]") != null) {
			emailBody = "\tSender Name: " + request.getParameter("form_fields[name]")
					+ "<br>";
		}
		if (request.getParameter("form_fields[email]") != null) {
			emailBody = emailBody + "\t Sender Email: "
					+ request.getParameter("form_fields[email]") + "<br>";
		}
		if (request.getParameter("form_fields[phone]") != null) {
			emailBody = emailBody + "\t Sender Phone: "
					+ request.getParameter("form_fields[phone]") + "<br>";
		}
		if (request.getParameter("form_fields[message]") != null) {
			emailBody = emailBody + "\t Message: " + request.getParameter("form_fields[message]")
					+ "<br>";
		}			

		javaEmail.createEmailMessage(emailSubject, emailBody);
		try {
			javaEmail.sendEmail();
			status = "success";
			 out.write("<script type='text/javascript'>\n");
             out.write("setTimeout(function(){window.location.href='Ack.jsp'},0);");
             out.write("</script>\n");  
		} catch (Exception me) {
			me.printStackTrace();
		}
	
%>