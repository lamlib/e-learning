<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:choose>
    <c:when test="${path == '/'}">
        <%@ include file="/WEB-INF/views/pages/home.jsp" %>
    </c:when>
    <c:when test="${path == '/error-404'}">
        <%@ include file="/WEB-INF/views/error/404.jsp" %>
    </c:when>
    <c:when test="${path == '/error-403'}">
        <%@ include file="/WEB-INF/views/pages/403.jsp" %>
    </c:when>
    <c:when test="${path == '/error-500'}">
        <%@ include file="/WEB-INF/views/pages/500.jsp" %>
    </c:when>
    <c:when test="${path == '/error-502'}">
        <%@ include file="/WEB-INF/views/pages/502.jsp" %>
    </c:when>
    <c:when test="${path == '/error-503'}">
        <%@ include file="/WEB-INF/views/pages/503.jsp" %>
    </c:when>
    <c:when test="${path == '/error-504'}">
        <%@ include file="/WEB-INF/views/pages/504.jsp" %>
    </c:when>
    <c:otherwise>
        <%@ include file="/WEB-INF/views/errors/404.jsp" %>
    </c:otherwise>
</c:choose>
