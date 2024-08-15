import { useEffect } from "react";

export default function CourseEnrollModal({
    dialogTitle, course, enrollCourse
}: {
    dialogTitle: string,
    course: any,
    enrollCourse: () => void
}
) {
    useEffect(() => {
        if (course) {
            console.log("Received selected course:", course.name);
        }
    }, [course]);

    return (
        <div id={`wd-enroll-course-dialog-${course?._id}`} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            <span className="text-danger">{dialogTitle}</span> </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Do you confirm that you want to enroll in this course?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel </button>
                        <button onClick={enrollCourse} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Yes </button>
                    </div>
                </div>
            </div>
        </div>
    );
}