const addMessage = (
  documentInstance,
  { company, employee, office, message, time },
  comment
) => {
  documentInstance
    .font("Helvetica-Bold")
    .fontSize(14)
    .text(company, {
      lineGap: 5,
    })
    .font("Helvetica")
    .fontSize(10)
    .text(time)
    .fontSize(10)
    .text(employee + ", " + office, {
      lineGap: 20,
    })
    .fontSize(12)
    .text(message)
    .text(" ", { lineGap: comment ? 5 : 30 });
};

const addComment = (documentInstance, { employee, office, message, time }) => {
  documentInstance
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(employee + ", " + office + ": " + time, {
      lineGap: 2,
    })
    .font("Helvetica")
    .fontSize(10)
    .text(message)
    .text(" ", { lineGap: 10 });
};

export default (documentInstance, messages) => {
  messages.forEach((message) => {
    addMessage(documentInstance, message, message.comments.length > 0);
    if (message.comments.length > 0) {
      documentInstance.font("Helvetica-Bold").fontSize(12).text("Comments", {
        lineGap: 10,
      });
      message.comments.forEach((comment) =>
        addComment(documentInstance, comment)
      );
      documentInstance.text(" ", { lineGap: 20 });
    }
  });
};
