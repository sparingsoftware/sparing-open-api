export type AnchorTypeEnum =
  | 'simplepage'
  | 'attachment'
  | 'article'
  | 'url'
  | 'calendly'
  | 'video_popup'

export type BlankEnum = ''

/**
 * * `primary` - Podstawowy
 * * `secondary` - Drugorzędny
 * * `tertiary` - Trzeciorzędny
 */
export type ButtonColorEnum = 'primary' | 'secondary' | 'tertiary'

export type CustomAuthToken = {
  token: string
}

export type CustomAuthTokenRequest = {
  /**
   * Hasło
   * @minLength 1
   */
  password: string
  /** @minLength 1 */
  email: string
}

/**
 * * `spectacle` - Spektakl
 * * `concert` - Koncert
 */
export type EventTypeEnum = 'spectacle' | 'concert'

/**
 * * `no_margin` - Bez marginesu
 * * `small` - Mały
 * * `large` - Duży
 */
export type HorizontalMarginEnum = 'no_margin' | 'small' | 'large'

export type LanguageChoice = {
  label: string
  /**
   * * `en` - EN
   * * `pl` - PL
   */
  value: ValueEnum
}

/**
 * * `small` - Mały
 * * `medium` - Średni
 * * `large` - Duży
 * * `none` - Brak
 */
export type MarginBottomEnum = 'small' | 'medium' | 'large' | 'none'

/**
 * * `small` - Mały
 * * `medium` - Średni
 * * `large` - Duży
 * * `none` - Brak
 */
export type MarginTopEnum = 'small' | 'medium' | 'large' | 'none'

export type Option = {
  value: string
  label: string
}

export type PagesSitemapResponse = {
  simplepage: PublicSitemap[]
  article: PublicSitemap[]
}

export type PaginatedPublicArticleList = {
  /** @example 123 */
  count: number
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null
  results: PublicArticle[]
  /** @example 15 */
  page_size?: number
}

export type PaginatedPublicEventDateWithEventList = {
  /** @example 123 */
  count: number
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null
  results: PublicEventDateWithEvent[]
  /** @example 15 */
  page_size?: number
}

export type PaginatedPublicEventListList = {
  /** @example 123 */
  count: number
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null
  results: PublicEventList[]
  /** @example 15 */
  page_size?: number
}

export type PaginatedPublicPlaceList = {
  /** @example 123 */
  count: number
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null
  results: PublicPlace[]
  /** @example 15 */
  page_size?: number
}

export type PaginatedPublicSimplePageResponseList = {
  /** @example 123 */
  count: number
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null
  results: PublicSimplePageResponse[]
  /** @example 15 */
  page_size?: number
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicArticle = {
  id: string
  slug: string
  /**
   * Slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug_en?: string
  /**
   * Slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug_pl?: string
  title: string
  lead: string
  widgets: PublicWidget[]
  /**
   * Data publikacji
   * @format date-time
   */
  publication_date?: string | null
  image: PublicImage
  video_video_id: string
  video_is_vimeo: boolean
  tags: PublicTag[]
  author: PublicArticleAuthor
  meta_keywords: string
  caption: string
  banner_cta_button: PublicCtaButton | null
  banner_background: PublicImage
  banner_title: string
  banner_text: string
  is_banner_visible?: boolean
  banner_full_width?: boolean
  banner_with_white_text?: boolean
  related_articles: PublicRelatedArticles[] | null
  site_title: string
  meta_description: string
  og_title: string
  og_description: string
  og_image: PublicImage
}

export type PublicArticleAuthor = {
  id: string
  /**
   * Nazwa
   * @maxLength 256
   */
  name: string
  position: string
  bio: string
  /**
   * @format uri
   * @maxLength 200
   */
  linked_in?: string
  image: PublicImage
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicArticleDetail = {
  id: string
  slug: string
  /**
   * Slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug_en?: string
  /**
   * Slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug_pl?: string
  title: string
  lead: string
  widgets: PublicWidget[]
  /**
   * Data publikacji
   * @format date-time
   */
  publication_date?: string | null
  image: PublicImage
  video_video_id: string
  video_is_vimeo: boolean
  tags: PublicTag[]
  author: PublicArticleAuthor
  meta_keywords: string
  caption: string
  banner_cta_button: PublicCtaButton | null
  banner_background: PublicImage
  banner_title: string
  banner_text: string
  is_banner_visible?: boolean
  banner_full_width?: boolean
  banner_with_white_text?: boolean
  related_articles: PublicRelatedArticles[] | null
  site_title: string
  meta_description: string
  og_title: string
  og_description: string
  og_image: PublicImage
  /** @default "blog" */
  link_to_all: string
}

export type PublicArticleListWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  banner_title: string
  banner_text: string
  banner_cta_button: PublicCtaButton | null
  banner_background: PublicImage | null
  banner_with_white_text?: boolean
  is_banner_visible?: boolean
  banner_full_width?: boolean
  all_available_tags: PublicTag[]
  /** @default "ArticleListWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicBannerWithTextAndCtaWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  image: PublicImage
  title: string
  text: string
  /**
   * Mixin for parsing restql query from request.
   *
   * NOTE: We are using `request.GET` instead of
   * `request.query_params` because this might be
   * called before DRF request is created(i.e from dispatch).
   * This means `request.query_params` might not be available
   * when this mixin is used.
   */
  cta_button: PublicCtaButton
  with_white_text?: boolean
  full_width?: boolean
  /** @default "BannerWithTextAndCtaWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicBlockquoteWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  quote: string
  /** @maxLength 200 */
  signature?: string
  /** @default "BlockquoteWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicBoxWithTextItem = {
  id: number
  title: string
  text: string
}

export type PublicBoxWithTextWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  items: PublicBoxWithTextItem[]
  cta_button: PublicCtaButton | null
  /** @default "BoxWithTextWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicBulletListPoint = {
  content: string
}

export type PublicBulletListWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  points: PublicBulletListPoint[]
  /**
   * Mixin for parsing restql query from request.
   *
   * NOTE: We are using `request.GET` instead of
   * `request.query_params` because this might be
   * called before DRF request is created(i.e from dispatch).
   * This means `request.query_params` might not be available
   * when this mixin is used.
   */
  cta_button: PublicCtaButton
  /** @default "BulletListWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicContactFormWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  description: string
  image: PublicImage
  agreement_text: string
  is_text_left?: boolean
  /** @default "ContactFormWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicContactPerson = {
  id: number
  image: PublicImage
  /** @maxLength 128 */
  first_name: string
  /** @maxLength 128 */
  last_name: string
  /** @maxLength 128 */
  position: string
  /**
   * Adres e-mail
   * @format email
   * @maxLength 254
   */
  email?: string
  /**
   * Numer telefonu
   * @maxLength 128
   */
  phone?: string
  /**
   * @format uri
   * @maxLength 200
   */
  linked_in?: string
}

export type PublicContactsWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  people: PublicContactPerson[]
  /** @default "ContactsWidget" */
  resourcetype?: ResourcetypeEnum
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicCtaButton = {
  /**
   * * `primary` - Podstawowy
   * * `secondary` - Drugorzędny
   * * `tertiary` - Trzeciorzędny
   */
  color?: ButtonColorEnum
  link?: PublicLink | null
  title: string
}

export type PublicCtaButtonWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  /**
   * Mixin for parsing restql query from request.
   *
   * NOTE: We are using `request.GET` instead of
   * `request.query_params` because this might be
   * called before DRF request is created(i.e from dispatch).
   * This means `request.query_params` might not be available
   * when this mixin is used.
   */
  cta_button: PublicCtaButton
  /** @default "CtaButtonWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicCustomerLogo = {
  id: number
  logotype: PublicImage
  link?: PublicLink | null
}

export type PublicCustomersRangeWidget = {
  id: number
  /**
   * @min 0
   * @max 2147483647
   */
  min_users?: number
  /**
   * @min 0
   * @max 2147483647
   */
  max_users?: number | null
  activation_fee: string
  whats_included: string
  monthly_payment_price: string
  yearly_payment_price: string
  monthly_cta: PublicCtaButton | null
  yearly_cta: PublicCtaButton | null
  selected_by_default?: boolean
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicEvent = {
  id: string
  slug: string
  /**
   * @min 0
   * @max 2147483647
   */
  duration?: number | null
  description: string
  /**
   * Slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug_en?: string
  /**
   * Slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug_pl?: string
  image: PublicImage
  title: string
  widgets: PublicWidget[]
  /**
   * * `spectacle` - Spektakl
   * * `concert` - Koncert
   */
  type?: TypeEnum
  type_display: string
  dates: PublicEventDate[]
  site_title: string
  meta_description: string
  og_title: string
  og_description: string
  og_image?: string | null
}

export type PublicEventDate = {
  id: number
  /**
   * Mixin for parsing restql query from request.
   *
   * NOTE: We are using `request.GET` instead of
   * `request.query_params` because this might be
   * called before DRF request is created(i.e from dispatch).
   * This means `request.query_params` might not be available
   * when this mixin is used.
   */
  place: PublicPlace
  /** @format date-time */
  date: string
  /**
   * @format uri
   * @maxLength 200
   */
  ticket_url?: string
}

export type PublicEventDateOptions = {
  types: Option[]
  dates: string[]
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicEventDateWithEvent = {
  id: number
  /**
   * Mixin for parsing restql query from request.
   *
   * NOTE: We are using `request.GET` instead of
   * `request.query_params` because this might be
   * called before DRF request is created(i.e from dispatch).
   * This means `request.query_params` might not be available
   * when this mixin is used.
   */
  place: PublicPlace
  /** @format date-time */
  date: string
  /**
   * @format uri
   * @maxLength 200
   */
  ticket_url?: string
  event_title: string
  event_slug: string
  event_image: PublicImage
  /**
   * @min 0
   * @max 2147483647
   */
  event_duration: number | null
  event_type: EventTypeEnum
  event_type_display: string
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicEventList = {
  id: string
  slug: string
  image: PublicImage
  title: string
  /**
   * * `spectacle` - Spektakl
   * * `concert` - Koncert
   */
  type?: TypeEnum
  dates: PublicEventDate[]
}

export type PublicFaqItem = {
  id: number
  question: string
  answer: string
}

export type PublicFaqWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  items: PublicFaqItem[]
  /** @default "FaqWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicFooterItem = {
  label: string
  link?: PublicLink | null
  items: PublicSecondLevelFooterItem[]
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicFooterMenu = {
  id: string
  items: PublicFooterItem[]
  contact_text: string
}

export type PublicGalleryImage = {
  id: number
  image: PublicImage
}

export type PublicGalleryWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  images: PublicGalleryImage[]
  /** @default "GalleryWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicImage = {
  id: string
  images: string
  alt: string
  title: string
  /** @format uri */
  file?: string
  height: number | null
  width: number | null
  is_svg: boolean
  /**
   * @minLength 2
   * @maxLength 2
   */
  ppoi_tuple: string[]
  /** @maxLength 7 */
  dominant_color?: string
  has_transparency?: boolean
}

export type PublicImageTextListItem = {
  id: number
  title: string
  text: string
  subtitle: string
  image: PublicImage
}

export type PublicImageTextListWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  items: PublicImageTextListItem[]
  /** @default "ImageTextListWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicImageWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  image: PublicImage
  caption: string
  /**
   * * `no_margin` - Bez marginesu
   * * `small` - Mały
   * * `large` - Duży
   */
  horizontal_margin?: HorizontalMarginEnum
  /** @default "ImageWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicImageWithAccordionItem = {
  id: number
  title: string
  content: string
}

export type PublicImageWithAccordionsWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  image: PublicImage
  title: string
  items: PublicImageWithAccordionItem[]
  is_text_left?: boolean
  /** @default "ImageWithAccordionsWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicImageWithMultipleLinksWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  image: PublicImage
  map_areas: PublicMapArea[]
  /** @default "ImageWithMultipleLinksWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicImageWithTextWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  image: PublicImage
  video_video_id: string
  video_is_vimeo: boolean
  text: string
  title: string
  is_text_left?: boolean
  /**
   * Mixin for parsing restql query from request.
   *
   * NOTE: We are using `request.GET` instead of
   * `request.query_params` because this might be
   * called before DRF request is created(i.e from dispatch).
   * This means `request.query_params` might not be available
   * when this mixin is used.
   */
  cta_button: PublicCtaButton
  /** @default "ImageWithTextWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicImageWithTilesWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  image: PublicImage
  title: string
  is_text_left?: boolean
  cta_button: PublicCtaButton | null
  items: PublicTileItem[]
  /** @default "ImageWithTilesWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicLineUpWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  allow_date_filter?: boolean
  allow_place_filter?: boolean
  allow_category_filter?: boolean
  /** @default "LineUpWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicLink = {
  anchor_type: AnchorTypeEnum
  anchor_id: string
  slug: string
  target_blank?: boolean
  widget?: string | null
  url: string
  video_id: string
  video_is_vimeo: boolean
  label: string
  /** @format uri */
  attachment_file: string
  icon: string
  category: string
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicMainMenu = {
  id: string
  items: PublicMenuItem[]
  /**
   * Utworzony
   * @format date-time
   */
  created: string
  /**
   * Zmodyfikowany
   * @format date-time
   */
  modified: string
}

export type PublicMapArea = {
  id: string
  /**
   * @format uri
   * @maxLength 200
   */
  url?: string
  title?: string
  /**
   * @min 0
   * @max 2147483647
   */
  x: number
  /**
   * @min 0
   * @max 2147483647
   */
  y: number
  /**
   * @min 0
   * @max 2147483647
   */
  width: number
  /**
   * @min 0
   * @max 2147483647
   */
  height: number
}

export type PublicMenuItem = {
  label: string
  link?: PublicLink | null
  items: PublicSecondLevelMenuItem[] | null
}

export type PublicMessage = {
  /** @maxLength 128 */
  first_name: string
  /** @maxLength 128 */
  last_name: string
  /**
   * @format email
   * @maxLength 254
   */
  email: string
  /** @maxLength 500 */
  text: string
}

export type PublicMessageRequest = {
  /**
   * @minLength 1
   * @maxLength 128
   */
  first_name: string
  /**
   * @minLength 1
   * @maxLength 128
   */
  last_name: string
  /**
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string
  /**
   * @minLength 1
   * @maxLength 500
   */
  text: string
}

export type PublicNewsletterAgreement = {
  id: string
  text: string
  is_required?: boolean
}

export type PublicNewsletterSettings = {
  id: string
  first_agreement: PublicNewsletterAgreement
  second_agreement: PublicNewsletterAgreement
  third_agreement: PublicNewsletterAgreement
}

export type PublicNewsletterWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  settings: PublicNewsletterSettings
  /** @default "NewsletterWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicOurCustomersWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  logotypes: PublicCustomerLogo[]
  with_background?: boolean
  /** @default "OurCustomersWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicOurSolutionsItem = {
  id: number
  text: string
  icon: string
  link?: string | null
  title: string
}

export type PublicOurSolutionsWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  items: PublicOurSolutionsItem[]
  /**
   * Mixin for parsing restql query from request.
   *
   * NOTE: We are using `request.GET` instead of
   * `request.query_params` because this might be
   * called before DRF request is created(i.e from dispatch).
   * This means `request.query_params` might not be available
   * when this mixin is used.
   */
  cta_button: PublicCtaButton
  /** @default "OurSolutionsWidget" */
  resourcetype?: ResourcetypeEnum
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicPlace = {
  id: string
  name: string
  /** @pattern ^[-a-zA-Z0-9_]+$ */
  slug: string
}

export type PublicPricingWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  subtitle: string
  package_title: string
  tooltip_visible?: boolean
  tooltip_button_text: string
  tooltip_title: string
  tooltip_text: string
  ranges: PublicCustomersRangeWidget[]
  /** @default "PricingWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicRelatedArticles = {
  id: string
  slug: string
  title: string
  lead: string
  tags: PublicTag[]
  image: PublicImage
}

export type PublicSecondLevelFooterItem = {
  label: string
  link?: PublicLink | null
}

export type PublicSecondLevelMenuItem = {
  label: string
  link?: PublicLink | null
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicSeoSettings = {
  id: string
  meta_title: string
  og_title: string
  meta_title_template: string
  meta_description: string
  og_description: string
  meta_keywords: string
  og_image: PublicImage
  favicon: PublicImage
  /** @format uri */
  favicon_ico: string
  gtm_id: string
  gtag_id: string
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicSimplePageResponse = {
  id: string
  slug: string
  /**
   * Slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug_en?: string
  /**
   * Slug
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug_pl?: string
  title: string
  category: string
  widgets: PublicWidget[]
  meta_description: string
  site_title: string
  og_title: string
  og_description: string
  og_image: PublicImage
  /**
   * Zmodyfikowany
   * @format date-time
   */
  modified: string
  meta_keywords: string
  category_en: string
  category_pl: string
}

/**
 * Mixin for parsing restql query from request.
 *
 * NOTE: We are using `request.GET` instead of
 * `request.query_params` because this might be
 * called before DRF request is created(i.e from dispatch).
 * This means `request.query_params` might not be available
 * when this mixin is used.
 */
export type PublicSiteSettings = {
  id: string
  /**
   * @format uri
   * @maxLength 200
   */
  facebook_url?: string
  /**
   * @format uri
   * @maxLength 200
   */
  twitter_url?: string
  /**
   * @format uri
   * @maxLength 200
   */
  youtube_url?: string
  /**
   * @format uri
   * @maxLength 200
   */
  instagram_url?: string
  /**
   * @format uri
   * @maxLength 200
   */
  linkedin_url?: string
  /**
   * @format uri
   * @maxLength 200
   */
  spotify_url?: string
  /**
   * @format uri
   * @maxLength 200
   */
  apple_url?: string
  /**
   * @format uri
   * @maxLength 200
   */
  google_url?: string
  logotype_desktop: PublicImage
  logotype_mobile: PublicImage
  widget_margins: string
}

export type PublicSitemap = {
  /** @format date-time */
  modified: string
  slug_en?: string
  category_en?: string
  slug_pl?: string
  category_pl?: string
}

export type PublicSliderItem = {
  title: string
  subtitle: string
  link: PublicLink
  video_is_vimeo: boolean
  video_video_id: string
  image: PublicImage
  cta_button: PublicCtaButton | null
  cta_button_second: PublicCtaButton | null
}

export type PublicSliderWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  items: PublicSliderItem[]
  /** @default "SliderWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicSubscribe = {
  /** @format email */
  email: string
  /** @default false */
  first_agreement?: boolean
  /** @default false */
  second_agreement?: boolean
  /** @default false */
  third_agreement?: boolean
}

export type PublicSubscribeRequest = {
  /**
   * @format email
   * @minLength 1
   */
  email: string
  /** @default false */
  first_agreement?: boolean
  /** @default false */
  second_agreement?: boolean
  /** @default false */
  third_agreement?: boolean
}

export type PublicTag = {
  id: string
  /**
   * Nazwa
   * @maxLength 30
   */
  name: string
  /**
   * * `blue` - Niebieski
   * * `green` - Zielony
   * * `navy` - Granatowy
   * * `yellow` - Żółty
   * * `blue-light` - Jasnoniebieski
   * * `green-light` - Jasnozielony
   */
  color?: TagColorEnum
  protected_tag?: boolean
}

export type PublicTextWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  text: string
  /** @default "TextWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicTextWithSliderItem = {
  id: number
  text: string
  position: string
  /** @maxLength 255 */
  name: string
  image: PublicImage
}

export type PublicTextWithSliderWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  items: PublicTextWithSliderItem[]
  is_text_left?: boolean
  /** @default "TextWithSliderWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicTileItem = {
  id: number
  text: string
  icon: string
}

export type PublicTileWithTextCard = {
  id: number
  title: string
  description: string
  cta_button: PublicCtaButton | null
  labels: PublicTileWithTextLabel[]
  image: PublicImage
}

export type PublicTileWithTextLabel = {
  id: number
  /**
   * Nazwa
   * @maxLength 30
   */
  text: string
  /**
   * * `blue` - Niebieski
   * * `green` - Zielony
   * * `navy` - Granatowy
   * * `yellow` - Żółty
   * * `blue-light` - Jasnoniebieski
   * * `green-light` - Jasnozielony
   */
  color?: TagColorEnum
}

export type PublicTileWithTextWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  items: PublicTileWithTextCard[]
  cta_button: PublicCtaButton | null
  /** @default "TileWithTextWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicTilesItem = {
  id: number
  title: string
  image: PublicImage
  link: PublicLink
}

export type PublicTilesWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  items: PublicTilesItem[]
  /**
   * Mixin for parsing restql query from request.
   *
   * NOTE: We are using `request.GET` instead of
   * `request.query_params` because this might be
   * called before DRF request is created(i.e from dispatch).
   * This means `request.query_params` might not be available
   * when this mixin is used.
   */
  cta_button: PublicCtaButton
  /** @default "TilesWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicTweetEmbedSerializer = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  /** @maxLength 20 */
  tweet_id: string
  /** @default "TweetEmbedWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicUpcomingEventsWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  allow_date_filter?: boolean
  allow_category_filter?: boolean
  /** @default "UpcomingEventsWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicVideoWidget = {
  margin_top?: MarginTopEnum | BlankEnum
  margin_bottom?: MarginBottomEnum | BlankEnum
  id: string
  title: string
  video_video_id: string
  video_is_vimeo: boolean
  /** @default "VideoWidget" */
  resourcetype?: ResourcetypeEnum
}

export type PublicWidget =
  | PublicArticleListWidget
  | PublicBannerWithTextAndCtaWidget
  | PublicBulletListWidget
  | PublicBlockquoteWidget
  | PublicBoxWithTextWidget
  | PublicContactFormWidget
  | PublicContactsWidget
  | PublicCtaButtonWidget
  | PublicFaqWidget
  | PublicGalleryWidget
  | PublicImageWidget
  | PublicImageWithMultipleLinksWidget
  | PublicImageWithTextWidget
  | PublicImageTextListWidget
  | PublicOurSolutionsWidget
  | PublicOurCustomersWidget
  | PublicTextWithSliderWidget
  | PublicImageWithTilesWidget
  | PublicImageWithAccordionsWidget
  | PublicLineUpWidget
  | PublicNewsletterWidget
  | PublicPricingWidget
  | PublicSliderWidget
  | PublicTileWithTextWidget
  | PublicTextWidget
  | PublicTweetEmbedSerializer
  | PublicTilesWidget
  | PublicUpcomingEventsWidget
  | PublicVideoWidget

/**
 * * `ArticleListWidget` - ArticleListWidget
 * * `BannerWithTextAndCtaWidget` - BannerWithTextAndCtaWidget
 * * `BulletListWidget` - BulletListWidget
 * * `BlockquoteWidget` - BlockquoteWidget
 * * `BoxWithTextWidget` - BoxWithTextWidget
 * * `ContactFormWidget` - ContactFormWidget
 * * `ContactsWidget` - ContactsWidget
 * * `CtaButtonWidget` - CtaButtonWidget
 * * `FaqWidget` - FaqWidget
 * * `GalleryWidget` - GalleryWidget
 * * `ImageWidget` - ImageWidget
 * * `ImageWithMultipleLinksWidget` - ImageWithMultipleLinksWidget
 * * `ImageWithTextWidget` - ImageWithTextWidget
 * * `ImageTextListWidget` - ImageTextListWidget
 * * `OurSolutionsWidget` - OurSolutionsWidget
 * * `OurCustomersWidget` - OurCustomersWidget
 * * `TextWithSliderWidget` - TextWithSliderWidget
 * * `ImageWithTilesWidget` - ImageWithTilesWidget
 * * `ImageWithAccordionsWidget` - ImageWithAccordionsWidget
 * * `LineUpWidget` - LineUpWidget
 * * `NewsletterWidget` - NewsletterWidget
 * * `PricingWidget` - PricingWidget
 * * `SliderWidget` - SliderWidget
 * * `TileWithTextWidget` - TileWithTextWidget
 * * `TextWidget` - TextWidget
 * * `TweetEmbedWidget` - TweetEmbedWidget
 * * `TilesWidget` - TilesWidget
 * * `UpcomingEventsWidget` - UpcomingEventsWidget
 * * `VideoWidget` - VideoWidget
 */
export type ResourcetypeEnum =
  | 'ArticleListWidget'
  | 'BannerWithTextAndCtaWidget'
  | 'BulletListWidget'
  | 'BlockquoteWidget'
  | 'BoxWithTextWidget'
  | 'ContactFormWidget'
  | 'ContactsWidget'
  | 'CtaButtonWidget'
  | 'FaqWidget'
  | 'GalleryWidget'
  | 'ImageWidget'
  | 'ImageWithMultipleLinksWidget'
  | 'ImageWithTextWidget'
  | 'ImageTextListWidget'
  | 'OurSolutionsWidget'
  | 'OurCustomersWidget'
  | 'TextWithSliderWidget'
  | 'ImageWithTilesWidget'
  | 'ImageWithAccordionsWidget'
  | 'LineUpWidget'
  | 'NewsletterWidget'
  | 'PricingWidget'
  | 'SliderWidget'
  | 'TileWithTextWidget'
  | 'TextWidget'
  | 'TweetEmbedWidget'
  | 'TilesWidget'
  | 'UpcomingEventsWidget'
  | 'VideoWidget'

/**
 * * `blue` - Niebieski
 * * `green` - Zielony
 * * `navy` - Granatowy
 * * `yellow` - Żółty
 * * `blue-light` - Jasnoniebieski
 * * `green-light` - Jasnozielony
 */
export type TagColorEnum =
  | 'blue'
  | 'green'
  | 'navy'
  | 'yellow'
  | 'blue-light'
  | 'green-light'

/**
 * * `spectacle` - Spektakl
 * * `concert` - Koncert
 */
export type TypeEnum = 'spectacle' | 'concert'

/**
 * * `en` - EN
 * * `pl` - PL
 */
export type ValueEnum = 'en' | 'pl'

import type { AxiosInstance, AxiosRequestConfig, ResponseType } from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || ''
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] =
        property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        )
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body)
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {})
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path
      })
      .then(response => response.data)
  }
}

type Flatten<T> = T extends any[] ? T[number] : T
type ChangeTypeOfKeys<T extends object, Keys extends keyof T, NewType> = {
  [key in keyof T]: key extends Keys ? NewType : T[key]
}
type MapObjectKeysToTrue<ObjectType extends Record<PropertyKey, any>> = {
  [key in keyof ObjectType]?: IsAny<ObjectType[key]> extends true
    ? true
    : ObjectType[key] extends Record<PropertyKey, any>
    ? true | MapObjectKeysToTrue<Flatten<ObjectType[key]>>
    : true
}
type FetchKeysType = { [key in PropertyKey]: true | FetchKeysType }
type FetchKeysObject<ResponseModel> = ResponseModel extends {
  count?: number
  results?: Array<infer DataModel>
}
  ? DataModel extends Record<PropertyKey, any>
    ? MapObjectKeysToTrue<DataModel>
    : DataModel
  : ResponseModel extends Record<PropertyKey, any>
  ? MapObjectKeysToTrue<Flatten<ResponseModel>>
  : ResponseModel

type NestedSafePick<ResponseModel, FetchKeysType> = ResponseModel extends Array<
  infer Model
>
  ? NestedSafePick<Model, FetchKeysType>[]
  : {
      [key in keyof FetchKeysType]: FetchKeysType[key] extends Record<
        PropertyKey,
        any
      >
        ? key extends keyof ResponseModel
          ? ResponseModel[key] extends Array<infer DataModel>
            ? NestedSafePick<DataModel, FetchKeysType[key]>[]
            : NestedSafePick<ResponseModel[key], FetchKeysType[key]>
          : never
        : key extends keyof ResponseModel
        ? ResponseModel[key] extends Array<infer DataModel>
          ? DataModel[]
          : ResponseModel[key]
        : never
    }

type PickKeysFromObject<ResponseModel, FetchKeysType> = {} extends FetchKeysType
  ? ResponseModel
  : ResponseModel extends {
      count?: number
      results?: Array<infer DataModel>
    }
  ? ChangeTypeOfKeys<
      ResponseModel,
      'results',
      NestedSafePick<DataModel, FetchKeysType>[]
    >
  : ResponseModel extends Array<infer DataModel>
  ? NestedSafePick<DataModel, FetchKeysType>[]
  : NestedSafePick<ResponseModel, FetchKeysType>

function getStringifiedQueryKeys(keys: FetchKeysObject<unknown>) {
  let query = '{'
  Object.entries(keys as FetchKeysType).forEach(([key, value], index) => {
    if (typeof value === 'object') {
      const keyToAdd = `${key}${getStringifiedQueryKeys(value)}`
      query += index > 0 ? `,${keyToAdd}` : keyToAdd
    } else {
      query += index > 0 ? `,${key}` : key
    }
  })
  return query + '}'
}

type IsArray<T> = T extends Array<any> ? true : false
type IsAny<T> = 0 extends 1 & T ? true : false

type DotNotationKeys<T, P extends string = ''> = IsAny<T> extends true
  ? P
  : T extends object
  ? IsArray<T> extends true
    ? P extends ''
      ? never
      : P
    : {
        [K in keyof T]: K extends string
          ? P extends ''
            ? K | DotNotationKeys<T[K], K>
            : `${P}.${K}` | DotNotationKeys<T[K], `${P}.${K}`>
          : never
      }[keyof T]
  : P

type FetchKeysArray<ResponseModel> = ResponseModel extends (infer DataModel)[]
  ? DotNotationKeys<DataModel>[]
  : ResponseModel extends {
      results?: Array<infer DataModel>
      count?: number
    }
  ? DotNotationKeys<DataModel>[]
  : DotNotationKeys<ResponseModel>[]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S]

type PickByPath<T, Path extends any[]> = Path extends [infer P, ...infer Rest]
  ? P extends keyof T
    ? { [K in P]: PickByPath<T[P], Rest> }
    : unknown
  : T

type ObjectWithKeysFromArray<T, Keys extends string[]> = UnionToIntersection<
  {
    [K in keyof Keys]: PickByPath<T, Split<Extract<Keys[K], string>, '.'>>
  }[number]
>

type Modify<T, R> = Omit<T, keyof R> & R

type PickKeysFromArray<
  ResponseModel,
  Keys extends string[]
> = Keys extends never[]
  ? ResponseModel
  : ResponseModel extends (infer DataModel)[]
  ? Merge<ObjectWithKeysFromArray<DataModel, Keys>>[]
  : ResponseModel extends { results?: Array<infer DataModel>; count?: number }
  ? Merge<
      Modify<
        ResponseModel,
        { results: ObjectWithKeysFromArray<DataModel, Keys>[] }
      >
    >
  : Merge<ObjectWithKeysFromArray<ResponseModel, Keys>>

type Merge<T> = {
  [K in keyof T]: T[K]
}

export function validateArrayFetchKeys(paths: string[]) {
  if (paths.length !== new Set(paths).size)
    throw new Error(`Duplicate key in fetchKeys:
  ${JSON.stringify(paths, null, 2)}`)
  paths.forEach((path, index) =>
    paths.forEach((otherPath, otherIndex) => {
      if (otherPath.startsWith(path) && index !== otherIndex)
        throw new Error(
          `Invalid duplicate nesting in fetchKeys: ${path} and ${otherPath}`
        )
    })
  )
}

function getFetchKeysFromArray(paths: string[]) {
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production')
    validateArrayFetchKeys(paths)
  const fetchKeys: FetchKeysType = {}
  for (const path of paths) {
    let currentObject = fetchKeys
    const nestedFields = path.split('.')
    for (const nestedField of nestedFields.slice(0, -1)) {
      if (!currentObject[nestedField]) currentObject[nestedField] = {}
      currentObject = currentObject[nestedField] as FetchKeysType
    }
    currentObject[nestedFields.at(-1) as string] = true
  }
  return getStringifiedQueryKeys(fetchKeys)
}

export type FetchKeys<ResponseModel = unknown> =
  | FetchKeysObject<ResponseModel>
  | FetchKeysArray<ResponseModel>
export type PickKeys<
  ResponseModel,
  KeysToFetch extends FetchKeys<ResponseModel>
> = KeysToFetch extends string[]
  ? PickKeysFromArray<ResponseModel, KeysToFetch>
  : PickKeysFromObject<ResponseModel, KeysToFetch>

function getQuery(fetchKeys: FetchKeys) {
  return Array.isArray(fetchKeys)
    ? getFetchKeysFromArray(fetchKeys)
    : getStringifiedQueryKeys(fetchKeys)
}

export function postprocessQuery(params?: any) {
  if (!params) return params
  if (params.fetchKeys) params.query = getQuery(params.fetchKeys)
  delete params.fetchKeys
  return params
}

/**
 * @title API* @version 1.0.0 (v1)*/
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  public = {
    /**
     * No description
     *
     * @tags public
     * @name PublicContactMessageCreate
     * @request POST:/public/contact/message/
     * @secure
     */
    publicContactMessageCreate: <T extends FetchKeys<PublicMessage>>(
      data: PublicMessageRequest,
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicMessage, T>, any>({
        path: `/public/contact/message/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
    /**
     * No description
     *
     * @tags public
     * @name PublicCoreLanguagesList
     * @request GET:/public/core/languages/
     * @secure
     */,
    publicCoreLanguagesList: <T extends FetchKeys<LanguageChoice[]>>(
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<LanguageChoice[], T>, any>({
        path: `/public/core/languages/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicCoreSeoSettingsRetrieve
     * @request GET:/public/core/seo-settings/
     * @secure
     */,
    publicCoreSeoSettingsRetrieve: <T extends FetchKeys<PublicSeoSettings>>(
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicSeoSettings, T>, any>({
        path: `/public/core/seo-settings/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicCoreSettingsRetrieve
     * @request GET:/public/core/settings/
     * @secure
     */,
    publicCoreSettingsRetrieve: <T extends FetchKeys<PublicSiteSettings>>(
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicSiteSettings, T>, any>({
        path: `/public/core/settings/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * No description
     *
     * @tags public
     * @name PublicImagesIconsRetrieve
     * @request GET:/public/images/icons/
     * @secure
     */,
    publicImagesIconsRetrieve: <T extends FetchKeys<void>>(
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<void, T>, any>({
        path: `/public/images/icons/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicMenuFooterRetrieve
     * @request GET:/public/menu/footer/
     * @secure
     */,
    publicMenuFooterRetrieve: <T extends FetchKeys<PublicFooterMenu>>(
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicFooterMenu, T>, any>({
        path: `/public/menu/footer/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicMenuMainRetrieve
     * @request GET:/public/menu/main/
     * @secure
     */,
    publicMenuMainRetrieve: <T extends FetchKeys<PublicMainMenu>>(
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicMainMenu, T>, any>({
        path: `/public/menu/main/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * No description
     *
     * @tags public
     * @name PublicNewsletterSubscribeCreate
     * @request POST:/public/newsletter/subscribe/
     * @secure
     */,
    publicNewsletterSubscribeCreate: <T extends FetchKeys<PublicSubscribe>>(
      data: PublicSubscribeRequest,
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicSubscribe, T>, any>({
        path: `/public/newsletter/subscribe/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicPagesArticlesList
     * @request GET:/public/pages/articles/
     * @secure
     */,
    publicPagesArticlesList: <T extends FetchKeys<PaginatedPublicArticleList>>(
      query?: {
        author?: string
        is_highlighted?: boolean
        /** A page number within the paginated result set. */
        page?: number
        /** Number of results to return per page. */
        page_size?: number
        tags?: string[]

        fetchKeys?: T
      },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PaginatedPublicArticleList, T>, any>({
        path: `/public/pages/articles/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicPagesArticlesRetrieve
     * @request GET:/public/pages/articles/{slug}/
     * @secure
     */,
    publicPagesArticlesRetrieve: <T extends FetchKeys<PublicArticleDetail>>(
      slug: string,
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicArticleDetail, T>, any>({
        path: `/public/pages/articles/${slug}/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicPagesEventsList
     * @request GET:/public/pages/events/
     * @secure
     */,
    publicPagesEventsList: <T extends FetchKeys<PaginatedPublicEventListList>>(
      query?: {
        /** @format date */
        date_from?: string
        /** @format date */
        date_to?: string
        id?: string
        /** A page number within the paginated result set. */
        page?: number
        /** Number of results to return per page. */
        page_size?: number
        place?: string[]
        tags?: string[]
        /**
         * * `spectacle` - Spektakl
         * * `concert` - Koncert
         */
        type?: 'concert' | 'spectacle'

        fetchKeys?: T
      },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PaginatedPublicEventListList, T>, any>({
        path: `/public/pages/events/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicPagesEventsRetrieve
     * @request GET:/public/pages/events/{slug}/
     * @secure
     */,
    publicPagesEventsRetrieve: <T extends FetchKeys<PublicEvent>>(
      slug: string,
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicEvent, T>, any>({
        path: `/public/pages/events/${slug}/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicPagesEventsDatesList
     * @request GET:/public/pages/events/dates/
     * @secure
     */,
    publicPagesEventsDatesList: <
      T extends FetchKeys<PaginatedPublicEventDateWithEventList>
    >(
      query?: {
        /** @format date */
        date_from?: string
        /** @format date */
        date_to?: string
        event?: string[]
        /**
         * * `spectacle` - Spektakl
         * * `concert` - Koncert
         */
        event__type?: 'concert' | 'spectacle'
        id?: number
        /** Which field to use when ordering the results. */
        ordering?: string
        /** A page number within the paginated result set. */
        page?: number
        /** Number of results to return per page. */
        page_size?: number
        place?: string[]
        tags?: string[]

        fetchKeys?: T
      },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PaginatedPublicEventDateWithEventList, T>, any>({
        path: `/public/pages/events/dates/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicPagesEventsDatesRetrieve
     * @request GET:/public/pages/events/dates/{id}/
     * @secure
     */,
    publicPagesEventsDatesRetrieve: <
      T extends FetchKeys<PublicEventDateWithEvent>
    >(
      id: number,
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicEventDateWithEvent, T>, any>({
        path: `/public/pages/events/dates/${id}/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Handler method for HTTP 'OPTIONS' request.
     *
     * @tags public
     * @name PublicPagesEventsDatesOptionsRetrieve
     * @request GET:/public/pages/events/dates/options/
     * @secure
     */,
    publicPagesEventsDatesOptionsRetrieve: <
      T extends FetchKeys<PublicEventDateOptions>
    >(
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicEventDateOptions, T>, any>({
        path: `/public/pages/events/dates/options/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicPagesSimplePagesList
     * @request GET:/public/pages/simple-pages/
     * @secure
     */,
    publicPagesSimplePagesList: <
      T extends FetchKeys<PaginatedPublicSimplePageResponseList>
    >(
      query?: {
        /** A page number within the paginated result set. */
        page?: number
        /** Number of results to return per page. */
        page_size?: number
        /** A search term. */
        search?: string

        fetchKeys?: T
      },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PaginatedPublicSimplePageResponseList, T>, any>({
        path: `/public/pages/simple-pages/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * @description Mixin for parsing restql query from request. NOTE: We are using `request.GET` instead of `request.query_params` because this might be called before DRF request is created(i.e from dispatch). This means `request.query_params` might not be available when this mixin is used.
     *
     * @tags public
     * @name PublicPagesSimplePagesRetrieve
     * @request GET:/public/pages/simple-pages/{slug}/
     * @secure
     */,
    publicPagesSimplePagesRetrieve: <
      T extends FetchKeys<PublicSimplePageResponse>
    >(
      slug: string,
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicSimplePageResponse, T>, any>({
        path: `/public/pages/simple-pages/${slug}/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * No description
     *
     * @tags public
     * @name PublicPagesSitemapRetrieve
     * @request GET:/public/pages/sitemap/
     * @secure
     */,
    publicPagesSitemapRetrieve: <T extends FetchKeys<PagesSitemapResponse>>(
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PagesSitemapResponse, T>, any>({
        path: `/public/pages/sitemap/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * No description
     *
     * @tags public
     * @name PublicPlacesList
     * @request GET:/public/places/
     * @secure
     */,
    publicPlacesList: <T extends FetchKeys<PaginatedPublicPlaceList>>(
      query?: {
        /** A page number within the paginated result set. */
        page?: number
        /** Number of results to return per page. */
        page_size?: number

        fetchKeys?: T
      },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PaginatedPublicPlaceList, T>, any>({
        path: `/public/places/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * No description
     *
     * @tags public
     * @name PublicPlacesRetrieve
     * @request GET:/public/places/{id}/
     * @secure
     */,
    publicPlacesRetrieve: <T extends FetchKeys<PublicPlace>>(
      id: string,
      query?: { fetchKeys?: T },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<PublicPlace, T>, any>({
        path: `/public/places/${id}/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
    /**
     * No description
     *
     * @tags public
     * @name PublicUsersTokenLoginCreate
     * @request POST:/public/users/token/login/
     * @secure
     */,
    publicUsersTokenLoginCreate: <T extends FetchKeys<CustomAuthToken>>(
      data: CustomAuthTokenRequest,
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<CustomAuthToken, T>, any>({
        path: `/public/users/token/login/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  schema1234 = {
    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags schema-1234
     * @name Schema1234Retrieve
     * @request GET:/schema-1234/
     * @secure
     */
    schema1234Retrieve: <T extends FetchKeys<Record<string, any>>>(
      query?: {
        format?: 'json' | 'yaml'
        lang?: 'en' | 'pl'

        fetchKeys?: T
      },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<Record<string, any>, T>, any>({
        path: `/schema-1234/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
  }
  schemaPublic = {
    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags schema-public
     * @name SchemaPublicRetrieve
     * @request GET:/schema-public/
     * @secure
     */
    schemaPublicRetrieve: <T extends FetchKeys<Record<string, any>>>(
      query?: {
        format?: 'json' | 'yaml'
        lang?: 'en' | 'pl'

        fetchKeys?: T
      },
      params: RequestParams = {}
    ) =>
      this.request<PickKeys<Record<string, any>, T>, any>({
        path: `/schema-public/`,
        method: 'GET',
        query: postprocessQuery(query),
        secure: true,
        format: 'json',
        ...params
      })
  }
}
