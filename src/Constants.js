const prod =  "http://localhost:8080" //"https://configmonster.easy2easiest.com:13002"


const QUERY_USER_API = prod+'/v1/audit/adminuser' // GET method
const ADD_USER_API = prod+'/v1/audit/adminuser' // POST method
const DELETE_USER_API = prod+'/v1/audit/adminuser' // DELETE method
 
const QUERY_FULL_VERSION_CONTROL_API = prod+'/v1/audit/versioncontrol/full'
const QUERY_SUMMARIZE_VERSION_CONTROL_API = prod+'/v1/audit/versioncontrol/summarize'
const DELETE_SUMMARIZE_VERSION_CONTROL_API = prod+'/v1/audit/versioncontrol/summarize'
const QUERY_FIELDS_IN_EVENT_RELATIONS_API = prod+'/v1/audit/events/fieldrelations'
const QUERY_EVENTS_IN_FIELD_RELATIONS_API = prod+'/v1/audit/fields/eventrelations'
const ADD_EVENT_API = prod+'/v1/audit/events'
const DELETE_EVENT_API = prod+'/v1/audit/events'
const ADD_FIELD_API = prod+'/v1/audit/fields'
const DELETE_FIELD_API = prod+'/v1/audit/fields'
const EDIT_FIELD_API = prod+'/v1/audit/fields'
const EDIT_EVENT_API = prod+'/v1/audit/events'
const EDIT_EVENT_FIELD_API = prod+'/v1/audit/events/fieldrelations'
const DELETE_EVENT_FIELD_API = prod+'/v1/audit/events/fieldrelations'
const EXPORT_TXT_API = prod+'/v1/audit/export/txt'
const EXPORT_CSV_API = prod+'/v1/audit/export/csv'


const QUERY_TABLE_MICROSERVICE_API = prod+'/v1/config/tablemapping'
const QUERY_NOTIFICATION_MESSAGE = prod+'/v1/config/notification/preview'
const QUERY_FLYWAY_TABLE_API = prod+'/v1/config/flywaytable'
const QUERY_TABLE_DETAIL_API = prod+'/v1/config/tablemapping/detail'
const QUERY_USER_ROLE_API = prod+'/v1/audit/userrole'
const ADD_VERSION_CONTROL_API = prod+'/v1/audit/versioncontrol/add'
const SAVE_TABLE_MAPPING_API = prod+'/v1/config/tablemapping'
const SAVE_TABLE_DETAIL_API = prod+'/v1/config/tablemapping/detail'
const EDIT_TABLE_API = prod+'/v1/config/tablestructure'
const SNACK_BAR_SUCCESS = "success"
const SNACK_BAR_ERROR = "error"
const FLYWAY_SCRIPT_TABLE = "user_flyway_script"
const EXPORT_DATA_API = prod+"/v1/audit/export"





const QUERY_EVENT_SUMMARY_API = prod+"/v1/audit/events/summary"
const QUERY_FIELD_DICTIONARY_API = prod+"/v1/audit/fields/summary"

const EVENT_TABLE_INDEX = 'Event Summary'
const FIELD_TABLE_INDEX = 'Field Dictionary'
// const EDIT_TABLE_INDEX = 1
const ADD_EVENT_INDEX = 'Add Event'
const ADD_FIELD_INDEX = 'Add Field'
const IMPORT_EXPORT_INDEX = 'Import & Export'
const VERSION_CONTROL_INDEX = 'Version Control'
const ADD_VERSION_CONTROL_INDEX = 'Add Version Control'
const MANAGE_ADMIN_INDEX = 'Admin Tools'
const TUTORIAL_INDEX = "Tutorial"
const EDIT_EVENT_FIELD_INDEX = "Edit Event & Field"

// new const EDIT_TABLE_INDEX = 1
const TRANSLATION_TABLE_INDEX = 'Translation Baseline'
const TABLE_OF_CONTENT_INDEX = 'Table Of Content'
const AUDIT_LOG_INDEX = 'Audit Log'
const EXPORT_INDEX = 'Export'

// API LINK FOR TRANSLATION BASELINE
const QUERY_TRANSLATION_DATA_API = prod+"/v1/translation/translationbaselinetable"
const QUERY_FILTER_LIST = prod+"/v1/translation/screenId"



// Dev environment
const DEV2 = 'Dev-2'
const DEV3 = 'Dev-3'
const DEV4 = 'Dev-4'
const DEV5 = 'Dev-5'

const NOTI_VARIABLE = "AD"

module.exports = {
    prod,
    QUERY_USER_API,ADD_USER_API,EXPORT_TXT_API,EXPORT_CSV_API,
    QUERY_FULL_VERSION_CONTROL_API,QUERY_SUMMARIZE_VERSION_CONTROL_API,DELETE_SUMMARIZE_VERSION_CONTROL_API,QUERY_TABLE_MICROSERVICE_API,
    ADD_VERSION_CONTROL_API,SAVE_TABLE_DETAIL_API,EDIT_TABLE_API,EXPORT_DATA_API,DELETE_USER_API,SAVE_TABLE_MAPPING_API,
    QUERY_NOTIFICATION_MESSAGE,DELETE_EVENT_API,DELETE_FIELD_API,DELETE_EVENT_FIELD_API,
    TRANSLATION_TABLE_INDEX,AUDIT_LOG_INDEX,EXPORT_INDEX,TABLE_OF_CONTENT_INDEX,
    EVENT_TABLE_INDEX,FIELD_TABLE_INDEX,ADD_EVENT_INDEX,ADD_FIELD_INDEX,IMPORT_EXPORT_INDEX,VERSION_CONTROL_INDEX,MANAGE_ADMIN_INDEX,ADD_VERSION_CONTROL_INDEX,QUERY_TABLE_DETAIL_API,TUTORIAL_INDEX,
    SNACK_BAR_SUCCESS,SNACK_BAR_ERROR,FLYWAY_SCRIPT_TABLE,QUERY_FLYWAY_TABLE_API,QUERY_USER_ROLE_API,

    DEV2,DEV3,DEV4,DEV5,NOTI_VARIABLE,ADD_EVENT_API,ADD_FIELD_API, EDIT_FIELD_API,EDIT_EVENT_API,EDIT_EVENT_FIELD_API,
    QUERY_EVENT_SUMMARY_API,QUERY_FIELD_DICTIONARY_API,QUERY_FIELDS_IN_EVENT_RELATIONS_API,QUERY_EVENTS_IN_FIELD_RELATIONS_API,



    QUERY_TRANSLATION_DATA_API,QUERY_FILTER_LIST

}
