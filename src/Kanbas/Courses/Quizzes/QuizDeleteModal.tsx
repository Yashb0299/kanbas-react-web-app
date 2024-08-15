import * as client from "./client";

export default function QuizDeleteModal(
    { dialogTitle, quizId, deleteQuiz }: {
        dialogTitle: string,
        quizId: string,
        deleteQuiz: (quizId: string) => void
    }
) {

    const removeQuiz = async (quizId: string) => {
        try {
            await client.deleteQuiz(quizId);
            deleteQuiz(quizId);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div id={`wd-delete-quiz-dialog-${quizId}`} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            <span className="text-danger">{dialogTitle}</span> </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Do you confirm that you want to delete this quiz?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel </button>
                        <button onClick={() => removeQuiz(quizId)} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Yes </button>
                    </div>
                </div>
            </div>
        </div>
    );
}