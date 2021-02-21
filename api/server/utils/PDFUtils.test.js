import addMessagesAndComments from "./PDFUtils";

describe("PDFUtils", () => {
  test("addMessagesAndComments", () => {
    const documentInstance = {
      font: jest.fn().mockReturnThis(),
      fontSize: jest.fn().mockReturnThis(),
      text: jest.fn().mockReturnThis(),
    };
    const messagesAndComments = [
      {
        company: "foo",
        employee: "John",
        office: "Corporate",
        time: "Jan 01, 2020 12:00 am",
        message: "bar",
        comments: [
          {
            employee: "Jane",
            office: "Austin",
            message: "baz",
            time: "Jan 02, 2020 12:00 am",
          },
        ],
      },
    ];
    addMessagesAndComments(documentInstance, messagesAndComments);

    expect(documentInstance.font).toHaveBeenNthCalledWith(1, "Helvetica-Bold");
    expect(documentInstance.font).toHaveBeenNthCalledWith(2, "Helvetica");
    expect(documentInstance.font).toHaveBeenNthCalledWith(3, "Helvetica-Bold");
    expect(documentInstance.font).toHaveBeenNthCalledWith(4, "Helvetica-Bold");
    expect(documentInstance.font).toHaveBeenNthCalledWith(5, "Helvetica");

    expect(documentInstance.fontSize).toHaveBeenNthCalledWith(1, 14);
    expect(documentInstance.fontSize).toHaveBeenNthCalledWith(2, 10);
    expect(documentInstance.fontSize).toHaveBeenNthCalledWith(3, 10);
    expect(documentInstance.fontSize).toHaveBeenNthCalledWith(4, 12);
    expect(documentInstance.fontSize).toHaveBeenNthCalledWith(5, 12);
    expect(documentInstance.fontSize).toHaveBeenNthCalledWith(6, 9);
    expect(documentInstance.fontSize).toHaveBeenNthCalledWith(7, 10);

    expect(documentInstance.text).toHaveBeenNthCalledWith(
      1,
      messagesAndComments[0].company,
      {
        lineGap: 5,
      }
    );
    expect(documentInstance.text).toHaveBeenNthCalledWith(
      2,
      messagesAndComments[0].time
    );
    expect(documentInstance.text).toHaveBeenNthCalledWith(
      3,
      `${messagesAndComments[0].employee}, ${messagesAndComments[0].office}`,
      {
        lineGap: 20,
      }
    );
    expect(documentInstance.text).toHaveBeenNthCalledWith(
      4,
      messagesAndComments[0].message
    );
    expect(documentInstance.text).toHaveBeenNthCalledWith(5, " ", {
      lineGap: 5,
    });
    expect(documentInstance.text).toHaveBeenNthCalledWith(6, "Comments", {
      lineGap: 10,
    });
    expect(documentInstance.text).toHaveBeenNthCalledWith(
      7,
      `${messagesAndComments[0].comments[0].employee}, ${messagesAndComments[0].comments[0].office}: ${messagesAndComments[0].comments[0].time}`,
      {
        lineGap: 2,
      }
    );
    expect(documentInstance.text).toHaveBeenNthCalledWith(
      8,
      messagesAndComments[0].comments[0].message
    );
    expect(documentInstance.text).toHaveBeenNthCalledWith(9, " ", {
      lineGap: 10,
    });
    expect(documentInstance.text).toHaveBeenNthCalledWith(10, " ", {
      lineGap: 20,
    });
  });
});
