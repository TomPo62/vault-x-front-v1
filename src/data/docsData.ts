// data/docsData.ts
import Intro, {
  sectionData as introSectionData,
} from "@/components/docs/Intro";
import GettingStarted, {
  sectionData as gettingStartedSectionData,
} from "@/components/docs/GettingStarted";

import Api, { sectionData as apiSectionData } from "@/components/docs/Api";
import TryItOutV1 from "@/components/docs/TryItOutV1";
import { LuBook, LuHome } from "react-icons/lu";
import ApiRoot, {
  sectionData as apiRootSectionData,
} from "@/components/docs/api/ApiRoot";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import { ImUpload2 } from "react-icons/im";
import ApiUpload, {
  sectionData as apiUploadSectionData,
} from "@/components/docs/api/ApiUpload";
import ApiPublicFiles, {
  sectionData as apiPublicFilesSectionData,
} from "@/components/docs/api/ApiPublicFiles";
import ApiPrivateFiles, {
  sectionData as apiPrivateFilesSectionData,
} from "@/components/docs/api/ApiPrivateFiles";
import ApiSearchPubFiles, {
  sectionData as apiSearchPubFilesSectionData,
} from "@/components/docs/api/ApiSearchPubFiles";
import ApiGetPublicFileByCid, {
  sectionData as apiGetPubFileByCIDSectionData,
} from "@/components/docs/api/ApiGetPubFileByCid";
import ApiDisplayFile, {
  sectionData as apiDisplayFileSectionData,
} from "@/components/docs/api/ApiDisplayFile";
import ApiGetPublicImageByCID, {
  sectionData as apiGetPubImgSectionData,
} from "@/components/docs/api/ApiGetPubImg";
import ApiGetPrivateImageByCID, {
  sectionData as apiGetPrivImgSectionData,
} from "@/components/docs/api/ApiGetPrivateImg";
import ApiTogglePrivacy, {
  sectionData as apiTogglePrivacySectionData,
} from "@/components/docs/api/ApiTogglePrivacy";
import ApiRenderLottie, {
  sectionData as apiRenderLottieSectionData,
} from "@/components/docs/api/ApiRenderLottie";

// Définition des documents avec une hiérarchie parent/enfant
export const docsData = [
  {
    id: 1,
    title: "Introduction to Veltyr",
    description: "Introduce You to Veltyr",
    descriptionIcon: LuHome,
    component: Intro,
    sectionData: introSectionData,
    parentId: null,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 2,
    title: "Getting Started",
    description: "Prepare You to use Veltyr",
    descriptionIcon: LuBook,
    component: GettingStarted,
    sectionData: gettingStartedSectionData,
    parentId: 1,
    tryItOut: true,
    tryItOutComponent: TryItOutV1,
  },
  // Ajoutez d'autres sections et sous-sections ici
  {
    id: 5,
    title: "API",
    description: "List all endpoints",
    descriptionIcon: IoFileTrayStackedOutline,
    component: Api,
    sectionData: apiSectionData,
    parentId: null,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 6,
    title: "API Root",
    description: "GET /",
    descriptionIcon: IoIosRocket,
    component: ApiRoot,
    sectionData: apiRootSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 7,
    title: "API Upload",
    description: "POST /upload",
    descriptionIcon: ImUpload2,
    component: ApiUpload,
    sectionData: apiUploadSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 8,
    title: "API Public Files",
    description: "GET /public-files",
    descriptionIcon: IoIosRocket,
    component: ApiPublicFiles,
    sectionData: apiPublicFilesSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 9,
    title: "API Private Files",
    description: "GET /private-files",
    descriptionIcon: IoIosRocket,
    component: ApiPrivateFiles,
    sectionData: apiPrivateFilesSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 10,
    title: "API Search Public Files",
    description: "GET /search-public-files",
    descriptionIcon: IoIosRocket,
    component: ApiSearchPubFiles,
    sectionData: apiSearchPubFilesSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 11,
    title: "API Get Public File by CID",
    description: "GET /file/public",
    descriptionIcon: IoIosRocket,
    component: ApiGetPublicFileByCid,
    sectionData: apiGetPubFileByCIDSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 12,
    title: "API Display File",
    description: "GET /file/display",
    descriptionIcon: IoIosRocket,
    component: ApiDisplayFile,
    sectionData: apiDisplayFileSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 13,
    title: "API Get Image by CID",
    description: "GET /file/img",
    descriptionIcon: IoIosRocket,
    component: ApiGetPublicImageByCID,
    sectionData: apiGetPubImgSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 14,
    title: "API Get Private Image by CID",
    description: "GET /file/private/img",
    descriptionIcon: IoIosRocket,
    component: ApiGetPrivateImageByCID,
    sectionData: apiGetPrivImgSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 15,
    title: "API Toggle File Privacy",
    description: "POST /file/toggle-private",
    descriptionIcon: ImUpload2,
    component: ApiTogglePrivacy,
    sectionData: apiTogglePrivacySectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
  {
    id: 16,
    title: "API Render Lottie",
    description: "GET /render-lottie",
    descriptionIcon: IoIosRocket,
    component: ApiRenderLottie,
    sectionData: apiRenderLottieSectionData,
    parentId: 5,
    tryItOut: false,
    tryItOutComponent: null,
  },
];
