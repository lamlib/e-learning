<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/plugin/bootstrap/bootstrap.min.css">
</head>
<body>

    <jsp:include page="/WEB-INF/views/common/header.jsp">
        <jsp:param name="text" value="This is text in header" />
    </jsp:include>

    <%@ include file="/WEB-INF/views/router.jsp" %>

    <jsp:include page="/WEB-INF/views/common/footer.jsp">
        <jsp:param name="text" value="This is text in footer" />
    </jsp:include>

    <script src="${pageContext.request.contextPath}/static/plugin/bootstrap/bootstrap.min.js"></script>
</body>
</html>