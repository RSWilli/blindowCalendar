export interface Schedule {
    lessons: Lesson[]
    bookings: any[]
    cancellation: any[]
}

export interface Lesson {
    Id: string
    start: string
    end: string
    Comment: null | string
    InventoryText: null
    BaseLesson_Id: number
    AdditionalLessonIdsString: null
    Subject_Id: number
    SubjectName: string
    SubjectDescription: null
    SubjectVisibility: number
    SubjectColor: string
    Teacher_Id: number
    TeacherName: string
    TeacherColor: string
    AdditionalTeacherNamesString: null
    AdditionalTeacherIdsString: null
    AdditionalClassIdsString: string | null
    AdditionalClassNamesString: string | null
    StudentClass_Id: number
    StudentClassName: string
    MainStudentClass_Id: number
    StudentClassColor: string
    School_Id: number
    Room_Id: number
    RoomName: string
    RoomColor: string
    AdditionalRooms: null
    AdditionalRoomIdsString: null
    SubId: null
    SubState: null
    SubAbsId: null
    DocumentationCount: number
    Keys: null
    IsPublic: boolean
    StudentsCount: number
}
