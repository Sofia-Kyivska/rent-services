import * as Yup from "yup";
import { regexUrl, regexGoogleLocation } from "@/utils/regularExpressions";


export const updatingDashboardSchema = Yup.object({
    newPriority: Yup.number()
        .moreThan(-1, "Тільки додатні числа")
        .typeError("Тільки числа")
        .required("Пріоритет це обовʼязкове поле"),
    newImgs: Yup.array().min(2, "Мінімум дві додаткові фотографії"),
    newAddressUa: Yup.string()
        .required("Адреса українською це обовʼязкове поле"),
    newAddressEn: Yup.string()
        .required("Адреса англійською це обовʼязкове поле"),
    newAddressRu: Yup.string()
        .required("Адреса російською це обовʼязкове поле"),
    newComplexUa: Yup.string(),
    newComplexEn: Yup.string(),
    newComplexRu: Yup.string(),
    newDistrictUa: Yup.string()
        .required("Район українською це обовʼязкове поле"),
    newDistrictEn: Yup.string()
        .required("Район англійською це обовʼязкове поле"),
    newDistrictRu: Yup.string()
        .required("Район російською це обовʼязкове поле"),
    newFlatNumber: Yup.string()
        .required("Номер квартири це обовʼязкове поле"),
    newGoogleMapLocation: Yup.string()
        .required("Google-локація це обовʼязкове поле")
        .matches(regexGoogleLocation, "https://maps.app.goo.gl/qvW2LmZFsvEDxMFej"),
    newPrice: Yup.number()
        .moreThan(-1, "Тільки додатні числа")
        .typeError("Тільки числа")
        .required("Ціна це обовʼязкове поле"),
    newBookingUrl: Yup.string()
        .matches(regexUrl, "https://www.booking.com"),
    newAmenities: Yup.array()
        .min(1, "Мінімум одне вибране поле"),
    newDescriptionUa: Yup.string()
        .required("Опис українською це обовʼязкове поле"),
    newDescriptionEn: Yup.string()
        .required("Опис англійською це обовʼязкове поле"),
    newDescriptionRu: Yup.string()
        .required("Опис англійською це обовʼязкове поле"),
})