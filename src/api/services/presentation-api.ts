import { AxiosRequestConfig } from 'axios'
import { Presentation } from 'src/models/presentation'
import { Answer, Slide } from 'src/models/slide'
import { http } from '..'
import { IData } from '../dtos/data-dto'
import { PresentationDto } from '../dtos/presentation-dto'
import { presentationMapper } from '../mappers/presentation.mapper'

const PRESENTATION_ROUTE = 'api/presentation'

export namespace PresentationApiService {
    // Public presentation
    export async function getPresentations(): Promise<Presentation[]> {
        const { data } = await http.get<IData<{ publicPresentations: PresentationDto[] }>>(PRESENTATION_ROUTE + '/all')
        return data.data.publicPresentations.map(dto => presentationMapper.fromDto(dto))
    }

    //Private presentation
    export async function getGroupPresentations(): Promise<Presentation[]> {
      const { data } = await http.get<IData<{ privatePresentations: PresentationDto[] }>>(PRESENTATION_ROUTE + '/all')
      return data.data.privatePresentations.map(dto => presentationMapper.fromDto(dto))
    }

    export async function getPresentationById(id: string): Promise<Presentation> {
        const { data } = await http.get<IData<{ presentation: PresentationDto }>>(PRESENTATION_ROUTE + '/' + id)
        return presentationMapper.fromDto(data.data.presentation);
    }

    export async function changePresentationSlide(currentSlideId: Slide['id'], presentationId: Presentation['id']): Promise<Presentation> {
        const { data } = await http.patch<IData<{ updatedPresentation: PresentationDto}>>(PRESENTATION_ROUTE + '/currentSlide', {
            currSlideId: currentSlideId,
            presentationId,
        })
        return presentationMapper.fromDto(data.data.updatedPresentation);
    }

    export async function voteQuestion(presentationId: Presentation['id'], answerId: Answer['id']): Promise<void> {
        return await http.patch(PRESENTATION_ROUTE + '/vote', {
            presentationId,
            answerId,
        })
    }

    export async function addPresentation(): Promise<any[]> {
        return []
    }

    export async function updatePresentationName(info: any): Promise<any>  {
        const { data } = await http.patch(
            PRESENTATION_ROUTE + "/changeName",
            {
                presentationId: info.presentationId,
                newName: info.newName
            })
        return data
    }

    export async function updatePresentationSlides(info: any): Promise<any> {
        const { data } = await http.patch(
            PRESENTATION_ROUTE + "/changeAllSlides",
            {
                presentationId: info.presentationId,
                slides: info.slides
            })
        return data
    }

    export async function removePresentation(presentationId: string): Promise<any> {
        const { data } = await http.delete<AxiosRequestConfig>(
            PRESENTATION_ROUTE + "/delete",
            {
                data: {
                    presentationId
                }
            })
        return data
    }

    // Public
    export async function createPresentation(name: string): Promise<any> {
        const { data } = await http.post(
            PRESENTATION_ROUTE + "/create",
            { name },
        )
        return data
    }
    export async function addCollaborator(presentationId: string, email: string): Promise<any> {
        const { data } = await http.patch<any>(PRESENTATION_ROUTE + '/addCollaborators', {
            presentationId,
            email
        })
        return data
    }
    export async function removeCollaborator(presentationId: string, email: string): Promise<any> {
        const { data } = await http.patch<any>(PRESENTATION_ROUTE + '/removeCollaborators', {
            presentationId,
            email
        })
        return data
    }

    // Group
    export async function createGroupPresentation(name: string, groupId: string): Promise<any> {
        const { data } = await http.post(
            PRESENTATION_ROUTE + "/createPrivate",
            { name, groupId },
        )
        return data
    }
    export async function isGroupPresenting(groupId: string): Promise<boolean> {
        const  { data } = await http.get<any>(PRESENTATION_ROUTE + "/isGroupPresenting/" + groupId)
        return data
    }

    // Present
    export async function isPresenting(presentationId: string): Promise<boolean> {
        const  { data } = await http.get<any>(PRESENTATION_ROUTE + "/isPresenting/" + presentationId)
        return data
    }

    export async function present(presentationId: string): Promise<any> {
        const { data } = await http.patch<any>(PRESENTATION_ROUTE + '/present', {
            presentationId,
        })
        return data
    }

    export async function stopPresent(presentationId: string): Promise<any> {
        const { data } = await http.patch<any>(PRESENTATION_ROUTE + '/present', {
            presentationId,
        })
        return data
    }
}
