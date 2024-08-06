class SessionFacade {
    


    session.receiveArticle('Artículo 1');
session.proceed(); // Mueve de Recepción a Bidding
session.startBidding();
session.proceed(); // Mueve de Bidding a Assignment
session.assignReviewers();
session.proceed(); // Mueve de Assignment a Review
session.reviewArticles();
session.proceed(); // Mueve de Review a Selection
session.selectArticles(); // Selecciona artículos

}